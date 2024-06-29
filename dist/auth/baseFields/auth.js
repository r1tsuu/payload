import { email } from '../../fields/validations.js';
const baseAuthFields = [
    {
        name: 'email',
        type: 'email',
        admin: {
            components: {
                Field: ()=>null
            }
        },
        label: ({ t })=>t('general:email'),
        required: true,
        unique: true,
        validate: email
    },
    {
        name: 'resetPasswordToken',
        type: 'text',
        hidden: true
    },
    {
        name: 'resetPasswordExpiration',
        type: 'date',
        hidden: true
    },
    {
        name: 'salt',
        type: 'text',
        hidden: true
    },
    {
        name: 'hash',
        type: 'text',
        hidden: true
    }
];
export default baseAuthFields;

//# sourceMappingURL=auth.js.map