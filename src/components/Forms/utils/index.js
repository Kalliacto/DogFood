import { Password, Input, Select, Textarea, Image, Switch, Tag } from '../Form';

export const renderTags = (fields, data, states, setSimilarPwd = () => {}, comparePwd = false) => {
    console.log(fields?.map((el) => console.log()));
    return fields?.map((el) => {
        const elData = data[el];
        switch (elData.format) {
            case 'textarea':
                return <Textarea key={el} name={el} {...elData} state={states[el]} />;
            case 'select':
                return <Select key={el} name={el} {...elData} state={states[el]} />;
            case 'image':
                return <Image key={el} name={el} {...elData} state={states[el]} />;
            case 'tag':
                return <Tag key={el} name={el} {...elData} state={states[el]} />;
            case 'switch':
                return <Switch key={el} name={el} {...elData} state={states[el]} />;
            case 'password':
                return (
                    <Password
                        key={el}
                        name={el}
                        {...elData}
                        state={states[el]}
                        compare={comparePwd}
                        setSimilar={setSimilarPwd}
                    />
                );

            default:
                return <Input key={el} name={el} {...elData} state={states[el]} />;
        }
    });
};
