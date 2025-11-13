const {z} = require("zod");

 const projectSchema = z.object({
    title: z.string().min(2, "Project title is required"),
    description: z.string().min(10, "Description should be at least 10 characters"),
    techStack: z.array(z.string().min(1)).optional(),
    link: z.string().url("Must be a valid URL").optional(),
});
module.exports={projectSchema};
