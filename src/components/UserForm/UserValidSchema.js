import * as Yup from 'yup';

// const regexPhone = /^\+380\d{9}$/;
// const regexSkype = /^\S[\S\s]{0,28}\S$/;

// Це валідація полів юзера на бекенді, пофіксила, тут теж повинно співпадати з нею!
const emailRegex = /^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/;
const phoneRegex = /^(\+\d{1,3}|\d{1,3}) \(\d{3}\) \d{3} \d{2} \d{2}$/;
const skypeRegex = /^(\+\d{1,3}|\d{1,3}) \(\d{3}\) \d{3} \d{2} \d{2}$/;
const birthdayRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])$/;

export const UserValidSchema = () =>
  Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name is too short - must be at least 3 characters')
      .max(20, 'Name is too long - must be no more than 29 characters'),
    birthday: Yup.string()
      .matches(birthdayRegex, 'Valid birthday has format YYYY-MM-DD')
      .notRequired(),
    email: Yup.string()
      .matches(emailRegex, 'Invalid email format')
      // .email('Invalid email')
      .required('Email is required'),
    phone: Yup.string()
      .matches(
        // regexPhone,
        // 'The phone number must start with +380 and be 9 digits long'
        phoneRegex,
        'Valid number is +38 (000) 123 45 67 or 38 (000) 123 45 67 and country code consist of 1-3 numbers or empty field phone'
      )
      // .min(13, 'Phone is too Short!')
      // .max(13, 'Phone is too Long!')
      .notRequired(),
    skype: Yup.string()
      // .matches(regexSkype, 'Skype must be between 3 and 16 characters')
      .matches(
        skypeRegex,
        'Valid skype number is +38 (000) 123 45 67 or 38 (000) 123 45 67 and country code consist of 1-3 numbers or empty field skype'
      )
      // .min(3, 'At least 3 digits required')
      // .max(16, 'At most 13 digits is required')
      .notRequired(),
  });
