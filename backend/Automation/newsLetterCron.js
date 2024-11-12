import cron from 'node-cron';
import { JobModel } from '../models/jobModel.js';
import { User } from '../models/userModel.js';
import { sendEmail } from '../utils/sendEmail.js';

export const newsLetterCorn=()=>{
  cron.schedule("*/1 * * * *",async()=>{
    console.log("Runnig cron automation");
const jobs=await JobModel.find({newsLetterSent:false}).populate({path:"company"}).sort({createdAt:-1});
console.log("yes");
console.log(jobs);
for(const job of jobs){
  try{
    const filteredUsers=await User.find({
      $or: [
                  { "profile.preferredJobRole.role1": job.title },
                    { "profile.preferredJobRole.role2": job.title },
                   { "profile.preferredJobRole.role3": job.title },
                  ],
    })
    console.log(filteredUsers);
    console.log("yes");
    for(const user of filteredUsers){
      const subject = `Hot Job Alert: ${job.title} in ${job.company.name} Available Now`;
      const message = `Hi ${user.fullName},\n\nGreat news! A new job that fits your niche has just been posted. The position is for a ${job.title} with ${job.company.name}, and they are looking to hire immediately.\n\nJob Details:\n- **Position:** ${job.title}\n- **Company:** ${job.company.name}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon’t wait too long! Job openings like these are filled quickly. \n\nWe’re here to support you in your job search. Best of luck!\n\nBest Regards,\nJobQuest Team`;
       sendEmail({
        email:user.email,
        subject,
        message

       })
    }
    job.newsLetterSent=true;
    await job.save();
  }catch(error){
 console.log("error in node corn catch block")
 return next(console.error(error||"Some error in corn"));
  }
}
})
}