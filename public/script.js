const textArea = document.getElementById("text_to_summarize");

const submitButton = document.getElementById("submit-button");

const summarizedTextArea = document.getElementById("summary");

textArea.addEventListener("input", verifyTextLength);

submitButton.addEventListener("click", submitData);

submitButton.disabled = true;
function verifyTextLength(e) {
   const textarea = e.target;
    if (textarea.value.length > 200 && textarea.value.length < 100000) {
         submitButton.disabled = false;
      } 
    else {
       submitButton.disabled = true;
      }
}

function submitData(e) {
   submitButton.classList.add("submit-button--loading");
   const text_to_summarize = textArea.value;

   var myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   
   var raw = JSON.stringify({
      "text_to_summarize": text_to_summarize
   });
   
   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
   };
   
   // Send the text to the server using fetch API
   
   fetch('/summarize', requestOptions)
      .then(x => x.json())
      .then(summary => {         
         summarizedTextArea.value = summary.summary_text;
         submitButton.classList.remove("submit-button--loading");
      })
      .catch(error => console.log('error', error));
}

document.querySelector("#xxx").onclick = e => {
    document.querySelector(".typewriter").animation = `typing 5s steps(35, end) forwards`;
}

const windowIntersectionObserver = new IntersectionObserver(e => {
   if (e[0].isIntersecting) {
      e[0].target.children[0].style.animation = `typing 5s steps(35, end) forwards`;
   }
}, {
   root: null,
   threshold: 0.9
})

windowIntersectionObserver.observe(document.querySelector('#ABC'))