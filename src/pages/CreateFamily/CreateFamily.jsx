import "./CreateFamily.css";
function CreateFamily() {
    function getRandomNumber() {
        return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    }
    let randomNum = getRandomNumber();
 /* add and if to check if the number already exists in the database */
    return (
        <div>
            <h2>Your family number is: {randomNum}</h2>
            <p>Give this number to the others menmbers of the family so that they can join!</p>
            <form>
                <label>Family name:</label>
                <input type="text" name="name" />
                <button type="submit">Create family</button>
            </form>
        </div>
    )
}
export default CreateFamily;