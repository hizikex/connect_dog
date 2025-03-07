export const buildErrorObject = (errors) => {
    const customErrors = {};
    
    errors.forEach((item) => {
        console.log(item);
        
      if (!Object.prototype.hasOwnProperty.call(customErrors, item.path.join('.'))) {
        let customErrorMessage;
        
        switch (item.type) {
          case `${item.type.split('.')[0]}.only`:
            customErrorMessage = `${item.context.value} is not a valid option`;
            break;
          case `${item.type.split('.')[0]}.required`:
            customErrorMessage = `${item.path.join('.')} is required`;
            break;
          case 'object.min':
            customErrorMessage = 'This request body should not be empty';
            break;
          case 'string.min':
            customErrorMessage = `${item.path.join('.')} should have at least ${item.context.limit} characters!`;
            break;
          case 'string.max':
            customErrorMessage = `${item.path.join('.')} should have at most ${item.context.limit} characters!`;
            break;
          case 'string.alphanum':
            customErrorMessage = `${item.path.join('.')} should contain only alphanumeric characters`;
            break;
          case 'string.base':
            customErrorMessage = `${item.path.join('.')} should be a string`;
            break;
          case 'string.length':
            customErrorMessage = `${item.path.join('.')} should only be ${item.context.limit} characters, no less, no more`;
            break;
          case 'number.base':
            customErrorMessage = `${item.path.join('.')} should be a number`;
            break;  
          default:
            customErrorMessage = undefined;
            break;
        }
  
        customErrors[item.path.join('.')] = {
          message: item.message.replace(/['"]+/g, ''),
          customErrorMessage
        };
      }
    });
    
    return customErrors;
  };

  export const validate = async (data, schema) => {
    const { error, value } = await schema.validate(data, { errors: { escapeHtml: true }, abortEarly: false });
  
    if (error) {
      const errorData = buildErrorObject(error.details);
  
      const errorMsg = new Error(errorData[Object.keys(errorData)[0]].customErrorMessage);
      console.log('ERROR', errorData);
      
      throw errorMsg;
    }
    return value;
  };