import { createAsyncThunk } from '@reduxjs/toolkit';
 
export const postLogin = createAsyncThunk('postLogin', async (formData, {rejectWithValue}) => {
  try {
    const res = await fetch(
      'https://api-car-rental.binaracademy.org/customer/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      },
    );
    const  body = await res?.json();
    if (!res.ok) throw new Error(body.message);
    return body;
  } catch (e) {console.log(e)
  return rejectWithValue(e.message)}
  
});
 
export const postRegister = createAsyncThunk(
  'postRegister',
  async (payload) => {
    const res = await fetch(``, {
      headers,
      body: stringify(payload),
    });
    return res?.json();
  },
);