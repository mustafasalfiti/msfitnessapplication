export function handleProductErrors(values) {
  let errors = {};
  if (values.name === "") {
    errors.name = "Please Enter a name";
  }
  if (values.amount === "") {
    errors.amount = "Please Enter a amount";
  }
  if (values.type === "") {
    errors.type = "please enter a type";
  }
  if (values.price === "") {
    errors.price = "Please enter a price";
  }
  if (values.description === "") {
    errors.description = "please Enter a description";
  }
  return errors;
}

export function handleMemberErrors(values) {
  let errors = {};
  if (values.username === "") {
    errors.username = "Please Enter a Username";
  }
  if (values.fullname === "") {
    errors.fullname = "Please Enter a Fullname";
  }
  if (values.phone_number === "") {
    errors.phone_number = "please enter a phone number";
  }
  if (values.branch === "") {
    errors.branch = "Please enter a branch";
  }
  if (values.gender === "") {
    errors.gender = "please Enter a gender";
  }
  if (values.address === "") {
    errors.address = "please Enter a address";
  }
  if (values.birthday === "") {
    errors.birthday = "please Enter a birthday";
  }
  if (values.register_date === "") {
    errors.register_date = "please Enter a register_date";
  }

  if (values.expire_date === "") {
    errors.expire_date = "please Enter a expire_date";
  }

  if (values.password === "") {
    errors.password = "please Enter a password";
  }
  return errors;
}

export function imageError(file) {
  if(!file) {
    return undefined;
  }
  let error = ''
  if(file.type === 'image/jpeg' || file.type ===  'image/jpg' || file.type === 'image/png') {
    if(file.size > 1000 * 1000 * 2) {
      return error = 'image must be no bigger than 2mb';
    }
  } else {
    return error = 'it must be an image with types of jpg jpeg png'
  }
}