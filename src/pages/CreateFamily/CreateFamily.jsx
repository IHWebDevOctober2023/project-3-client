import "./CreateFamily.css";
function CreateFamily() {
    return (
        <form>
            <label>Family name:</label>
            <input type="text" name="name" />
            <button type="submit">Create family</button>
        </form>
    )
}
export default CreateFamily;