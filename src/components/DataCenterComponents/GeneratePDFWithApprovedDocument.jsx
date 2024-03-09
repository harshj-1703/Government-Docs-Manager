import jsPDF from "jspdf";
import approvedDocumentsServices from "../../services/approved-document.services";
import ToastMessage from "../ToastMessage";

export const generatePDF = async (mobile, docId) => {
  try {
    const documentData =
      await approvedDocumentsServices.getapprovedDocumentsFromDocIdAndUserMobile(
        docId,
        mobile
      );
    const doc = new jsPDF();
    doc.text(documentData.doc.userMobile, 10, 10);
    doc.text(docId, 10, 20);
    doc.text(documentData.id, 10, 30);
    const pdfDataUri = doc.output("datauristring");

    // Create a new div element for the modal
    const modalDiv = document.createElement("div");
    modalDiv.style.position = "fixed";
    modalDiv.style.top = "0";
    modalDiv.style.left = "0";
    modalDiv.style.width = "100%";
    modalDiv.style.height = "100%";
    modalDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modalDiv.style.display = "flex";
    modalDiv.style.alignItems = "center";
    modalDiv.style.justifyContent = "center";
    modalDiv.style.zIndex = "9999";

    // Create a new iframe element for the PDF content
    const iframe = document.createElement("iframe");

    // Convert data URI to object URL
    const pdfBlob = new Blob([atob(pdfDataUri.split(",")[1])], {
      type: "application/pdf",
    });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    iframe.src = pdfUrl;

    iframe.style.width = "90%";
    iframe.style.height = "calc(100% - 40px)"; // Adjust for close button height
    iframe.style.border = "none";

    // Create a close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.padding = "5px 10px";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.backgroundColor = "red";
    closeButton.style.color = "white";
    closeButton.style.cursor = "pointer";

    // Append iframe and close button to the modal div
    modalDiv.appendChild(iframe);
    modalDiv.appendChild(closeButton);

    // Append modal div to the body
    document.body.appendChild(modalDiv);

    closeButton.addEventListener("click", () => {
      document.body.removeChild(modalDiv);
      URL.revokeObjectURL(pdfUrl);
    });
  } catch (error) {
    ToastMessage({
      message: "Error Opening PDF : ",
      type: "error",
    });
    console.error("Error generating PDF:", error);
  }
};
