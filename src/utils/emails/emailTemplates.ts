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

type offerMessagePayload = {
  name: string;
  jobTitle: string;
  companyName: string;
  companyEmail: string;
  registerLink: string;
};

export const offerLetterTemplate = (payload: offerMessagePayload) => {
  const html = `
  <p style="font-size:1.5rem">Dear ${payload.name},</p>

  <p>
  We are thrilled to extend a formal offer of employment to you for the position of ${payload.jobTitle} at ${payload.companyName}. Your exceptional qualifications and experience have impressed us, and we believe you will be a valuable addition to our team.
  </p> 
   <p>To accept this offer, please click on the following link within the next two weeks: <a href="${payload.registerLink}">link</a>.</p> 
   <p>You will be directed to a secure portal to complete your registration and provide any necessary documentation.</p>
   <p>
   Should you have any questions or require further information, please do not hesitate to reach out to ${payload.companyName} at <a href="mail:${payload.companyEmail}">${payload.companyEmail}</a>.
   </p>
  
  <p>We are excited about the prospect of having you on board and look forward to your positive response.</p> 
  
  <p>Welcome to ${payload.companyName}!</p> 
  
  <p>Sincerely,</p> 
  
  <p>${payload.companyName}</p>
  <p>${payload.companyEmail}</p>
  
  `;
  return html;
};

type rejectPayloadType = {
  name: string;
  jobTitle: string;
  companyName: string;
};
export const rejectionLetterTemplate = (payload: rejectPayloadType) => {
  const html = `Dear ${payload.name},

  <p>I hope this message finds you well. We want to express our sincere appreciation for your interest in the ${payload.jobTitle} position at ${payload.companyName} . Your application was carefully reviewed, and we were impressed with your qualifications.</p> 
  
  <p>After careful consideration, we regret to inform you that we have chosen to move forward with another candidate who closely aligns with our current needs.</p>  
  <p>We genuinely value your time and effort in applying with us and wish you every success in your job search.</p>
  
  <p>Thank you for considering ${payload.companyName} as a potential employer.</p>
  
  
  <p>Best regards,</p>
  
  <p> ${payload.companyName}</p>
  
  `;
  return html;
};

type setAdminType = {
  name: string;
  link: string;
};

export const changeToAdminTemplate = (payload: setAdminType) => {
  const html = `Dear ${payload.name},

  <p>You have requested to set your account to admin. Please click the link below </p>
        
  <a href="${payload.link}" style="display: inline-block; background-color: #007bff; color: #fff; margin-bottom: 0.5rem; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Click here</a>
  <br/>

  <p>if the reset button does not work here is the direct link</>
  <a href="${payload.link}">${payload.link}</a>
  <p>If you did not request this, please ignore this email.</p>
  
  `;
  return html;
};
