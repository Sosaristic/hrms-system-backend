type messagePayloadType = {
  name: string;
  link?: string;
  duration?: string;
};

export const resetPasswordTemplate = (payload: messagePayloadType) => {
  const html = `
    <p>Hello ${payload.name},</p>
        <p>You have requested to reset your password. Please click the link below to reset your password:</p>
        
        <a href="${payload.link}" style="display: inline-block; background-color: #007bff; color: #fff; margin-bottom: 0.5rem; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <br/>
        <b>Please note this link is valid for ${payload.duration}</b>

        <p>if the reset button does not work here is the direct link</>
        <a href="${payload.link}">${payload.link}</a>
        <p>If you did not request this, please ignore this email.</p>
    `;
  return html;
};

export const resetSuccessTemplate = (payload: messagePayloadType) => {
  const html = `
    <p>Hello ${payload.name},</p>
        <p>You have Successfully reset your password</p>
    
        <p>If you did not request this, Kindly message our customer services.</p>
        
    `;
  return html;
};
