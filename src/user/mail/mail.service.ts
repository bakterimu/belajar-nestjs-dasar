//value provider

export class MailService {
  sendMail() {
    console.log('Mail service working');
  }
}

export const mailService = new MailService();
