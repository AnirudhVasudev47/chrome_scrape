import React, {useEffect, useState} from "react";
import {
  Button,
  DateTimePicker,
  GridLayout,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  SingleSelect,
  SingleSelectOption,
  Textarea,
  TextInput,
  ToggleInput,
  Typography
} from "@strapi/design-system";

const uuid = require('short-uuid');


const ModalAddNotification = ({data, isNew = true, onClose, onFinish}) => {

  const [form, setForm] = useState({
    data: {
      uuid: '',
      type: '',
      hasEnding: false,
      to: '',
      title: '',
      message: '',
      start: '',
      end: '',
      repeat: '',
    }
  })

  const updateForm = (fieldName, data) => {
    return setForm({
      data: {
        ...form.data,
        [fieldName]: data,
      }
    })
  }

  useEffect(() => {
    if (isNew)
      updateForm('uuid', uuid.generate())
  }, []);

  return (
    <ModalLayout onClose={onClose} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Create a new notification
        </Typography>
      </ModalHeader>
      <ModalBody>
        <GridLayout>
          <TextInput placeholder="UUID" label="UUID" name="uuid" type={'text'} disabled
            // error={content.length > 5 ? 'Content is too long' : undefined}
                     value={form.data.uuid}/>
          <TextInput placeholder="Email address" label="To" name="to" type={'text'}
            // error={content.length > 5 ? 'Content is too long' : undefined}
                     onChange={e => updateForm('to', e.target.value)} value={form.data.to}/>
          <SingleSelect
            label="Notification Type"
            placeholder="Select the type you the notification delivered">
            <SingleSelectOption value="Push Notification">Push Notification</SingleSelectOption>
            <SingleSelectOption value="SMS">SMS</SingleSelectOption>
            <SingleSelectOption value="Email">Email</SingleSelectOption>
          </SingleSelect>
          <ToggleInput
            label="Has Ending" onLabel="True" offLabel="False"
            onChange={(value) => updateForm('hasEnding', value.target.checked)}
            hint="Set an ending date for the reccuring notification"/>
          <DateTimePicker
            onChange={(date) => updateForm('start', date)}
            label="Start Date" name="datepicker"
            clearLabel="Clear the datepicker"
            selectedDateLabel={formattedDate => `Date picker, current is ${formattedDate}`}/>
          {form.data.hasEnding
            ? <DateTimePicker
              onChange={(date) => updateForm('end', date)}
              label="End Date" name="datepicker"
              clearLabel="Clear the datepicker"
              selectedDateLabel={formattedDate => `Date picker, current is ${formattedDate}`}/>
            : <div/>}
          <SingleSelect
            label="Repeat" placeholder="Select the type you the notification delivered">
            <SingleSelectOption value="None">None</SingleSelectOption>
            <SingleSelectOption value="Monthly">Monthly</SingleSelectOption>
            <SingleSelectOption value="Weekly">Weekly</SingleSelectOption>
            <SingleSelectOption value="Yearly">Yearly</SingleSelectOption>
          </SingleSelect>
          <TextInput
            placeholder="Title" label="Title" name="title" type={'text'}
            // error={content.length > 5 ? 'Content is too long' : undefined}
            onChange={e => updateForm('title', e.target.value)} value={form.data.title}/>
          <Textarea
            placeholder="This is a content placeholder" label="Content"
            name="content" hint="Description line"
            onChange={e => updateForm('message', e.target.value)}>
            {form.data.message}
          </Textarea>
        </GridLayout>
      </ModalBody>
      <ModalFooter startActions={<Button onClick={onClose} variant="tertiary">
        Cancel
      </Button>} endActions={<>
        <Button onClick={onFinish}>Finish</Button>
      </>}/>
    </ModalLayout>
  )
}

export default ModalAddNotification;
