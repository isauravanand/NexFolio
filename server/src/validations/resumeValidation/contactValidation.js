const{z} = require("zod");

const contactSchema = z.object({
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number too long")
        .optional(),
    linkedin: z.string().url("Invalid LinkedIn URL").optional(),
    github: z.string().url("Invalid GitHub URL").optional(),
    portfolio: z.string().url("Invalid portfolio URL").optional(),
    address: z.string().optional(),
});

module.exports={contactSchema};