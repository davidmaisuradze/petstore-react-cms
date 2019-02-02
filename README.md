## Dynamic Forms JSON Model For State
```javascript
state = {
           formControls: {
               email: {
                   label: 'Email',
                   type: 'text',
                   value: '',
                   validators: {required: true, email: true},
                   errorMessages: {required: 'required', email: 'invalid format'},
                   errors: [],
                   isTouched: false
               },
               password: {
                   label: 'Password',
                   type: 'password',
                   value: '',
                   validators: {required: true, minLength: 6},
                   errorMessages: {required: 'required', minLength: 'mininum 6 characters'},
                   errors: [],
                   isTouched: false
               },
               confirmedPassword: {
                   label: 'Confirm Password',
                   type: 'password',
                   value: '',
                   validators: {required: true, equalTo: 'password'},
                   errorMessages: {required: 'required', equalTo: 'passwords not match'},
                   errors: [],
                   isTouched: false
               },
               mobilePhone: {
                   label: 'Phone',
                   type: 'text',
                   value: '',
                   validators: {required: true},
                   errorMessages: {required: 'required'},
                   errors: [],
                   isTouched: false
               },
               genderId: {
                   label: 'Gender',
                   type: 'select',
                   value: '',
                   validators: {required: true},
                   errorMessages: {required: 'required'},
                   errors: [],
                   options: [
                       {key: 'empty', label: '', value: ''},
                       {key: 'male', label: 'Male', value: '1'},
                       {key: 'female', label: 'Female', value: '2'}
                   ],
                   isTouched: false
               },
               surely: {
                   label: 'are you sure?',
                   type: 'radio',
                   value: '',
                   options: [
                       {key: 'yes', label: 'Yes', name: 'surely', value: 'yes'},
                       {key: 'no', label: 'No', name: 'surely', value: 'no'}
                   ],
                   isTouched: false
               },
               skills: {
                   label: "Skills",
                   type: "checkbox",
                   value: '',
                   options: [
                       {key: "reactjs", label: "ReactJS", value: "reactjs"},
                       {key: "angular", label: "Angular", value: "angular"},
                       {key: "vuejs", label: "VueJS", value: "vuejs"},
                   ],
                   isTouched: false
               },
           }
       };
```
       
  
      