import { useState } from "react";

const useDialogue = (
  title?: string,
  description?: string,
  closeBtnTxt?: string,
  id?: string,
) => {
  const [idS, setId] = useState(id || randomString());
  const [titleS, setTitle] = useState(title || "Untitled");
  const [descriptionS, setDescription] = useState(
    description || "No Description Provided",
  );
  const [closeBtnTxtS, setCloseBtnTxt] = useState(closeBtnTxt || "Close");

  const showDialogue = (
    title?: string,
    description?: string,
    closeBtnTxt?: string,
  ) => {
    if (title) setTitle(title);
    if (description) setDescription(description);
    if (closeBtnTxt) setCloseBtnTxt(closeBtnTxt);
    (document.getElementById(idS) as HTMLDialogElement)?.showModal();
  };
  const Dialogue = () => {
    return (
      <dialog id={idS} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg" id={`${idS}-title`}>
            {titleS}
          </h3>
          <p className="py-4" id={`${idS}-description`}>
            {descriptionS}
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" id={`${idS}-button`}>
                {closeBtnTxtS}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    );
  };
  return {
    Dialogue,
    setId,
    setTitle,
    setDescription,
    setCloseBtnTxt,
    showDialogue,
  };
};

export default useDialogue;

function randomString(length?: number): string {
  length = length || 10;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
