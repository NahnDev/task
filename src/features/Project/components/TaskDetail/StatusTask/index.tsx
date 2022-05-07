import { Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { CONTENT_PROJECT } from '../../../../../constants/global';
import { Task } from '../../../../../types/global';

type StatusTaskProps = {
    className?: string;
    name?: string;
    label?: string;

    task: Task;
    changeStatus: Function;
};

const { Option } = Select;
const options: any = CONTENT_PROJECT.tasks.filter;

function StatusTask(props: StatusTaskProps) {
    const [defaultValues, setDefaultValues] = useState<any>(props.task.status);

    useEffect(() => {
        setDefaultValues(props.task.status);
    }, [props.task]);

    return (
        <Row align="middle" className={`${props.className}`}>
            {props.label && <label className={`${props.className}--label`}>{props.label}</label>}
            <Select
                bordered={false}
                className={`${props.className}--input`}
                value={defaultValues}
                onChange={(value) => {
                    setDefaultValues(value);
                    props.changeStatus(value, 'status');
                }}
            >
                {options.map((value: any) => {
                    return (
                        <Option key={value.value} value={value.value}>
                            {value.title}
                        </Option>
                    );
                })}
            </Select>
        </Row>
    );
}

export default StatusTask;
