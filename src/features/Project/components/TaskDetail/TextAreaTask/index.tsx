import { Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Task } from '../../../../../types/global';

type IProps = {
    className?: string;
    placeholder?: string;
    name?: string;
    value?: any;
    label?: string;

    task: Task;
    changeDescription: Function;
};
const { TextArea } = Input;

function TextAreaTask(props: IProps) {
    const [valueInput, setValueInput] = useState<string>(props.task.name);

    useEffect(() => {
        setValueInput(props.task.description || '');
    }, [props.task]);

    return (
        <Row justify="center" className={`${props.className}`}>
            {props.label && (
                <label htmlFor={props.name} className={`${props.className}--label`}>
                    {props.label}
                </label>
            )}
            <TextArea
                rows={4}
                name={props.task.name}
                className={`${props.className}--area`}
                defaultValue={props.task.description}
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                onBlur={() => props.changeDescription(valueInput, 'description')}
                bordered={false}
            />
        </Row>
    );
}

export default TextAreaTask;
