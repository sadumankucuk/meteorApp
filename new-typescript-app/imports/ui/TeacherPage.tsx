import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Students } from '../api/models/StudentCollection';

interface Item {
    _id: string;
    username: string;
    email: string;
    class: string;
    ects: number;
    userId: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

interface TeacherPageProps {
    students: any
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditableTable = ({ students }: TeacherPageProps) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(students);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: Item) => record._id === editingKey;

    const edit = (record: any) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record._id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (id: string) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex(item => id === item._id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                Students.update(id, {
                    $set: {
                        ...row
                    }
                })
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'username',
            dataIndex: 'username',
            width: '25%',
            sorter: (a: any, b: any) => a.username.length - b.username.length,
        },
        {
            title: 'class',
            dataIndex: 'class',
            width: '15%',
            editable: true,
            sorter: (a: any, b: any) => a.class - b.class,
        },
        {
            title: 'ects',
            dataIndex: 'ects',
            width: '10%',
            editable: true,
            multiple: 1,
            sorter: (a: any, b: any) => a.ects - b.ects,

        },
        {
            title: 'email',
            dataIndex: 'email',
            width: '40%',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a href="#" onClick={() => save(record._id)} style={{ marginRight: 8 }}>
                            Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a href="#" >Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                        {' '}
                        <Popconfirm title="Sure to remove?" onConfirm={() => {
                            Meteor.call('student.remove', record._id, (err: any) => {
                                if (err) {
                                    console.error(err)
                                } else {

                                    Meteor.users.remove({ _id: record.userId });
                                    console.log(record)
                                    const newData = [...data];
                                    const index = newData.findIndex(item => record._id === item._id);
                                    newData.splice(index, 1);
                                    setData(newData);
                                }

                            })
                        }}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                            <a href="#" >Remove</a>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'ects' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
                rowKey="_id"
            />
        </Form>
    );
};

export default EditableTable;