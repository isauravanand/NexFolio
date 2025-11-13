const { z } = require("zod");
const { educationSchema } = require("./educationValidation");
const { workExperienceSchema } = require("./workEx");
const { projectSchema } = require("./projectValidation");
const { certificationSchema } = require("./certificationValidation");
const { skillSchema } = require("./skillValidation");
const { languageSchema } = require("./languageValidation");
const { interestSchema } = require("./interestValidation");

const resumeSchema = z.object({
    user: z.string().min(1, "User ID is required"),
    fullname: z.string().min(3, "Full name is required").max(100, "Name too long"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    linkedin: z.string().url("Enter valid LinkedIn URL").optional(),
    github: z.string().url("Enter valid GitHub URL").optional(),
    portfolio: z.string().url("Enter valid portfolio URL").optional(),
    profileSummary: z.string().min(20, "Profile summary must be descriptive").max(800),

    education: z.array(educationSchema).min(1, "At least one education entry required"),
    technicalSkills: z.array(skillSchema).min(1, "At least one skill required"),
    workExperience: z.array(workExperienceSchema).optional(),
    projects: z.array(projectSchema).optional(),
    certifications: z.array(certificationSchema).optional(),
    languages: z.array(languageSchema).optional(),
    interests: z.array(interestSchema).optional(),
    
});

module.exports = { resumeSchema };
