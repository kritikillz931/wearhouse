import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const ReminderForm = () => {
  //getting fetch calls from providers
    const { addReminder, getReminderById, updateReminder } = useContext(ReminderContext)
    const [reminder, setReminder ] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const {reminderId} = useParams();
	  const history = useHistory();
    const userId = parseInt(localStorage.getItem("wearhouse_user"))

    useEffect(() => {
     if(reminderId) {
       console.log('theres an id.... ')
       getReminderById(reminderId)
       .then(remind => {
         setReminder(remind)
       })
     }
    }, [])
   

    const handleControlledInputChange = (event) => {
      const newReminder = { ...reminder }
      newReminder[event.target.name] = event.target.value
      setReminder(newReminder)
    }

    const handleSaveReminder = () => {
        if (reminderId){
          console.log("UPDATING!")
          //PUT - update
          updateReminder({
              id: reminder.id,
              message: reminder.message,
              date: reminder.date,
              userId: userId
          })
          .then(() => history.push(`/Reminders`))
        }else {
          //POST - add
          addReminder({
              date: reminder.date,
              message: reminder.message,
              userId: userId
          })
          .then(() => history.push("/Reminders"))
        }
      }
      
    

      return (
        <>
          <form classname="reminderForm">
            <h2 className="reminderForm__title">{reminderId ? "Edit" : "New Reminder"}</h2>
            <fieldset>
              <input type="text" id="reminder__message" name="message" placeholder="reminder message" onChange={handleControlledInputChange} defaultValue={reminder.message} />
              <input type="date" id="reminder__date" name="date" placeholder="reminder message" onChange={handleControlledInputChange} defaultValue={reminder.date} />
            </fieldset>
            <button className="btn btn-primary"
            onClick={event => {
              event.preventDefault()
              handleSaveReminder()
            }}>Save</button>
          </form>

        </>

      )
    





  // return (
  //   <Form className="reminderForm">
  //     <h2 className="reminderForm__title">{reminderId ? <> Edit Reminder</> : <> New Reminder</>}</h2>
  //     <FormGroup>
        
  //         <Label htmlFor="reminderMessage">Reminder: </Label>
  //         <Input type="text" id="reminderMessage" name="name" required autoFocus className="form-control"
  //         placeholder="Type Reminder Here"
  //         onChange={(event) => {
  //           setReminderMessage(event.target.value)
  //         }}
  //         defaultValue={reminder.message}
  //         />
  //         <Input  id="reminderDate" name="date" required autoFocus className="form-control"type="date" onChange={e=> setReminderDate(e.target.value)} />
       
  //     </FormGroup>

  //     <Button className="btn btn-primary"
  //       onClick={event => {
  //         event.preventDefault() 
  //         handleSaveReminder()
  //       }}>
  //     {reminderId ? <>Update</> : <>Save </>}</Button>
  //   </Form>
  // )
}