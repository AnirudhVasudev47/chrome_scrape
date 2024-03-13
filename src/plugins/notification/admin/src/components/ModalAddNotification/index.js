import React, {useState} from "react";
import {
  Button,
  ModalLayout,
  ModalHeader,
  Typography,
  ModalBody,
  DateTimePicker,
  ModalFooter,
  Box,
  GridLayout,
  TextInput
} from "@strapi/design-system";
import {Information} from "@strapi/icons";

const ModalAddNotification = ({data, onClose, onFinish}) => {

  const [form, setForm] = useState({
    data: {
      uuid: '',
      type: '',
      to: '',
      title: '',
      message: '',
      start: '',
      end: '',
      repeat: '',
    }
  })

  const updateForm = (fieldName, data) => {
    console.log(data);
    return setForm({
      data: {
        ...form.data,
        [fieldName]: data,
      }
    })
  }

  return (
    <ModalLayout onClose={onClose} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add a new entry
        </Typography>
      </ModalHeader>
      <ModalBody>
        <GridLayout>
          <TextInput placeholder="Email address" label="To" name="to" type={'text'}
            // error={content.length > 5 ? 'Content is too long' : undefined}
                     onChange={e => updateForm('to', e.target.value)} value={form.data.to}/>
          <TextInput placeholder="Email address" label="To" name="to" type={'text'}
            // error={content.length > 5 ? 'Content is too long' : undefined}
                     onChange={e => updateForm('to', e.target.value)} value={form.data.to}/>
          <DateTimePicker
            onChange={(date) => {
              console.log('date: ', date)
            }} label="Date picker" name="datepicker"
            clearLabel="Clear the datepicker" onClear={() => {
          }}
            selectedDateLabel={formattedDate => `Date picker, current is ${formattedDate}`}/>
          {Array(13).fill(null).map((_, idx) => (
            <Box padding={4} hasRadius background={"neutral0"} key={`box-${idx}`}
                 shadow="tableShadow">
              <Typography>hello world hello world hello world hello world hello world</Typography>
            </Box>
          ))}
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
