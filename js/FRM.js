const FRM = {};

FRM.modalCount = 0;

FRM.background = () => {
    // Create the overlay div
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent grey
    overlay.style.zIndex = 1000 + FRM.modalCount * 2;
    document.body.appendChild(overlay);
    return overlay;
};
FRM.loading = () => {
    const overlay = FRM.background();

    // Create the loading modal div
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.zIndex = parseInt(overlay.style.zIndex) + 1;
    modal.style.backgroundColor = 'transparent'; // Transparent background for spinner only
    modal.style.padding = '0';
    modal.style.border = 'none';
    modal.style.maxWidth = '80%';
    modal.style.maxHeight = '80%';
    modal.style.overflow = 'hidden';
    modal.style.textAlign = 'center';

    // Create the loading spinner
    const spinner = document.createElement('div');
    spinner.style.border = '4px solid #f3f3f3'; /* Light grey */
    spinner.style.borderTop = '4px solid #007BFF'; /* Spinner color */
    spinner.style.borderRadius = '50%';
    spinner.style.width = '40px';
    spinner.style.height = '40px';
    spinner.style.animation = 'spin 2s linear infinite';

    // Add keyframes for the spinner animation
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);

    modal.appendChild(spinner);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Return a function to remove the modal
    return function removeLoadingModal() {
        FRM.modalCount -= 1;
        document.body.removeChild(modal);
        document.body.removeChild(overlay);
        document.head.removeChild(styleSheet);
    };
};
FRM.modal = (content, options={}) => {
    const overlay = FRM.background();

    // Create the modal div
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.zIndex = parseInt(overlay.style.zIndex) + 1;
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    modal.style.borderRadius = '8px';
    modal.style.maxWidth = '80%';
    modal.style.maxHeight = '80%';
    modal.style.overflowY = 'auto';

    // Create the content div
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    modal.appendChild(contentDiv);

    // Create the proceed button
    const proceedButton = document.createElement('button');
    proceedButton.textContent = 'Dismiss';
    if (options.isConfirmationModal) {
        proceedButton.textContent = 'Proceed';
    }
    proceedButton.style.marginTop = '20px';
    proceedButton.style.padding = '10px 20px';
    proceedButton.style.backgroundColor = '#007BFF';
    proceedButton.style.color = 'white';
    proceedButton.style.border = 'none';
    proceedButton.style.borderRadius = '4px';
    proceedButton.style.cursor = 'pointer';

    // Create the cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.backgroundColor = '#fff';
    cancelButton.style.color = '#333';
    cancelButton.style.marginTop = '20px';
    cancelButton.style.padding = '10px 20px';
    cancelButton.style.border = '1px solid #333';
    cancelButton.style.borderRadius = '4px';
    cancelButton.style.cursor = 'pointer';

    function proceed() {
        FRM.modalCount -= 1;
        document.body.removeChild(modal);
        document.body.removeChild(overlay);
        if (options.successFunc) {
            options.successFunc();
        }
    }
    function cancel() {
        FRM.modalCount -= 1;
        document.body.removeChild(modal);
        document.body.removeChild(overlay);
    }

    // Proceed the modal on button click
    proceedButton.addEventListener('click', proceed);
    cancelButton.addEventListener('click', cancel);

    if (options.isConfirmationModal) {
        modal.appendChild(cancelButton);
        modal.appendChild(document.createTextNode(' '));
    }
    modal.appendChild(proceedButton);

    // Append the modal to the body
    document.body.appendChild(modal);
};
FRM.listen = form => {
    form.addEventListener("submit", event => {
        event.preventDefault();
        (async () => {
            const removeLoadingModal = FRM.loading();
            try {
                const headers = {};
                const response = await fetch(form.action, {
                    method: "POST",
                    headers: headers,
                    body: new FormData(form),
                });
                removeLoadingModal();
                if (response.status >= 200 && response.status < 300) {
                    form.reset();
                }
                FRM.modal(await response.text());
            } catch(error) {
                removeLoadingModal();
                FRM.modal(`An error occurred: ${error}`);
            }
        })();
    });
};
