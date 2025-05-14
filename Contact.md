## Contact

.center: If you'd like to collaborate on a project or just say hi, feel free to reach out to me.

<link rel="stylesheet" href="https://formflow.org/styles.css" />
<form
    class="formflow"
    id="formflow"
    action="https://formflow.org/email"
    method="POST"
    enctype="multipart/form-data"
>
    <!-- REQUIRED FIELDS: user_id -->
    <input type="hidden" name="user_id" value="23d601f8-7f43-462e-91b1-ac7daa688ea3" />
    <!-- CUSTOM FIELDS: Name, Email, Message, Attachments -->
    <label for="field-name">Name:</label>
    <input id="field-name" type="text" name="Name" placeholder="Name" required />
    <label for="field-email">Email address:</label>
    <input id="field-email" type="email" name="Email" placeholder="Email address" required />
    <label for="field-message">Message:</label>
    <textarea id="field-message" name="Message" placeholder="Message"></textarea>
    <label for="field-attachments">File attachments:</label>
    <input type="file" name="Attachments" multiple />
    <button type="submit">Send</button>
</form>
<script src="https://hikaru.org/js/FRM.js"></script>
<script>FRM.listen(document.getElementById("formflow"));</script>
