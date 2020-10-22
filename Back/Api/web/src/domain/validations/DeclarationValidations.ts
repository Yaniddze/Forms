type ReturnType = {
  valid: boolean;
  message: string;
}

export function TitleValidation(title: string): ReturnType {
  const valid = title.length > 2;

  return {
    valid,
    message: valid ? '' : 'Минимум 3 символа',
  };
}
