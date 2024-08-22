
import classes from "./AdminPanel.module.css"

const AdminPanel = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return <div className={classes.inputForm}>
        <h1>Form</h1>
        <form onSubmit={handleSubmit}>
          <label>Place Name:
            <input type="text" required/>
          </label>
          <label>Price per Night:
            <input type="number" required/>
          </label>
          <label>Place Address
            <input type="text" required/>
          </label>
          <label>Upload place images
            <input type="file" multiple required/>
          </label>
          <select required>Select Category:
            <option value="" disabled selected>Select</option>
            <option value="option1">Villa</option>
            <option value="option2">Apartment</option>
            <option value="option3">House Boat</option>
          </select>
          <button type="submit">Submit</button>
    </form>
    </div>
}
export default AdminPanel;