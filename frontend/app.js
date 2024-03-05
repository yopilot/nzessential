import { db, storage } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";







// Show the data submitted
document
  .getElementById("submitData")
  .addEventListener("click", async function () {
    
    

    const data = {
      authorisedPerson: document.getElementById("authorisedPerson").value,
      jobTitle: document.getElementById("jobTitle").value,
      registeredName: document.getElementById("registeredName").value,
      tradingName: document.getElementById("tradingName").value,
      mainContactName: document.getElementById("mainContactName").value,
      mainContactPhone: document.getElementById("mainContactPhone").value,
      mainContactEmail: document.getElementById("mainContactEmail").value,
      interestedInSolar: document.getElementById("interestedInSolar").value,
      industryType: document.getElementById("industryType").value,
      isDecisionMaker: document.getElementById("isDecisionMaker").value,
      signedDate: document.getElementById("signedDate").value,
      dobSignatory: document.getElementById("dobSignatory").value,
      icp1: document.getElementById("icp1").value,
      gasIcp1: document.getElementById("gasIcp1").value,
      icp2: document.getElementById("icp2").value,
      gasIcp2: document.getElementById("gasIcp2").value,
      icp3: document.getElementById("icp3").value,
      gasIcp3: document.getElementById("gasIcp3").value,
      icp4: document.getElementById("icp4").value,
      gasIcp4: document.getElementById("gasIcp4").value,
      icp5: document.getElementById("icp5").value,
      gasIcp5: document.getElementById("gasIcp5").value,
      // signatureImage: signatureImage,
    };
    function showFillAllFieldsMessage() {
      document.getElementById('fillAllFieldsMessage').classList.remove('hidden');
  }

  // Function to hide the "Fill all required fields" message
  function hideFillAllFieldsMessage() {
      document.getElementById('fillAllFieldsMessage').classList.add('hidden');
  }
    
    function validateForm() {
  let fields = ["authorisedPerson", "jobTitle", "registeredName", "mainContactPhone", "mainContactEmail", "interestedInSolar", "industryType", "isDecisionMaker", "signedDate", "dobSignatory", "icp1"];
  
  for(let i = 0; i < fields.length; i++) {
    if(data[fields[i]] == "") {
      document.getElementById(fields[i]).scrollIntoView();
      return false;
    }
  }
  return true;
}


    if (validateForm() == false) {
      debugger;
      showFillAllFieldsMessage();
      // Hide the message after 5 seconds
      setTimeout(hideFillAllFieldsMessage, 150000);
      //scroll to top
      window.scrollTo(0, 0);
      return;
    }
    // change submit button text to submitting and clour to dark blue
    document.getElementById("submitData").innerText = "Submitting...";
    document.getElementById("submitData").style.backgroundColor = "#0d6efd";
    const canvasDataUrl = window.exportSignature(); // Get canvas content as a data URL

    // Convert data URL to Blob
    const response = await fetch(canvasDataUrl);
    const blob = await response.blob();

    // Upload Blob to Firebase Storage
    const storageRef = ref(
      storage,
      "signatures/" + new Date().getTime() + ".png"
    );
    await uploadBytes(storageRef, blob);

    // Get download URL
    const signatureImage = await getDownloadURL(storageRef);
    data["signatureImage"] = signatureImage;
    
    // Function to store data in Firestore
    async function storeData(data) {
      try {

        const docRef = await addDoc(collection(db, "user_data"), data);
        console.log("Data stored successfully with ID: ", docRef.id);

      } catch (error) {
        console.error("Error storing data: ", error);
      }
    }
    
    storeData(data);
    window.location.href = "thnx.html";


    console.log(JSON.stringify(data));
  });
