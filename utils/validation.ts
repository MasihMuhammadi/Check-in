
// Interface for validation function props.
interface validationProps {
  required: {
    name: string;
    isRequired?: boolean;
  };

  maxLength?: {
    value: number;
    message?: string;
  };

  minLength?: {
    value: number;
    message?: string;
  };

  min?: {
    value: number | string;
    message: string;
  };

  max?: {
    value: number;
    message: string;
  };

  valueAsNumber?: boolean;

  pattern?: RegExp;
}

// Validation function for input validations
export const validator = (options: validationProps) => {
  const { required, pattern, maxLength, minLength, min, max, valueAsNumber } =
    options;

  // Default required set to true, if provided, set to the provided value
  const isRequired =
    options.required?.isRequired !== undefined
      ? options.required.isRequired
      : true;

  // Capitalize the name of the field
  const name = "masih"

  return {
    required: {
      value: isRequired,
      message: `${name} is required`,
    },

    // if message is provided, use it, otherwise generate it.
    maxLength: maxLength
      ? {
        message: maxLength?.message
          ? maxLength.message
          : `${name} can not be more than ${maxLength.value} characters`,

        value: maxLength.value,
      }
      : undefined,

    // if message is provided, use it, otherwise generate it.
    minLength: minLength
      ? {
        message: minLength?.message
          ? minLength.message
          : `${name} can not be less than ${minLength.value} characters`,

        value: minLength.value,
      }
      : undefined,

    // if min is provided, return the object otherwise don't
    min: min ? { message: min.message, value: min.value } : undefined,
    max: max ? { message: max.message, value: max.value } : undefined,

    // If the value should be a number
    valueAsNumber: valueAsNumber,

    pattern: pattern
      ? {
        value: pattern,
        message: `${name} is not valid`,
      }
      : undefined,
  };
};

// Commonly used regex patterns
export const regList = {
  name: new RegExp(/^[a-zA-Z]+\s?[a-zA-Z]+$/),
  fullName: new RegExp(/^[A-Za-z]+\s[A-Za-z]+((\s[A-Za-z]+)+)?$/),
  numbers: new RegExp(/^[0-9]+$/),
  characters: new RegExp(/^[a-zA-Z -]*$/),
  phoneNumber: new RegExp(/^(?:\+|00)?(?:[0-9] ?){6,14}[0-9]$/i),
  organizerBio: new RegExp(/^(?!\s*$)[\s\S]+$/g),
  campaignTitle: new RegExp(/^[A-Za-z]+\s[A-Za-z]+(\s[A-Za-z]+)*\s*$/),
  notEmptyString: new RegExp(/^(?!\s*$)[\s\S]+$/g),
  district: new RegExp(/^[A-Za-z]{3,}/i),
  email: new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
};
