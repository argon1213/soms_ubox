import {useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Grid, RadioGroup } from '@mui/material';
import CustomColorRadio from '../../components/custom-components/RadioButton';
import CssFormControlLabel from "../../components/custom-components/FormControlLabel";
import CssTextField from '../../components/custom-components/TextField';
import Select from 'react-select';

export default function ContentPage4(props) {
    const { onChangeStep, onNotification, accountInfo, setAccountInfo } = props;
    const [isStudent, setIsStudent] = useState(0);
    const [instructions, setInstructions] = useState('');
    const [university, setUniversity] = useState({});
    const [studentID, setStudentID] = useState('');
    const [wechatID, setWechatID] = useState('');
    const [question1, setQuestion1] = useState(0);
    const [question2, setQuestion2] = useState(0);
    const [initial, setInitial] = useState(false);
    const { t } = useTranslation();

    const colourStyles = {
        option: (provided, state) => ({
            ...provided,
            color: '#666',
            backgroundColor: '#fff',
            border: 'none',
            fontSize: '16px',
        }),
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: '#fff',
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            display: 'none',
        }),
        placeholder: (provided, state) => {
            const color = '#FFBE3D';
            const fontSize = '18px';
            return { ...provided, color, fontSize};
        },
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            const color = '#000';
            return { ...provided, color, opacity, transition };
        },
        menuList: (base) => ({
            ...base,

            "::-webkit-scrollbar": {
                width: "4px",
                height: "0px",
            },
            "::-webkit-scrollbar-track": {
                background: "#f1f1f1"
            },
            "::-webkit-scrollbar-thumb": {
                background: "#888"
            },
            "::-webkit-scrollbar-thumb:hover": {
                background: "#555"
            }
        }),
        control: (base, state) => ({
            ...base,
            background: 'transparent',
            // Overwrittes the different states of border
            backgroundColor: 'transparent',
            color: '#666',
            border: 'none',
            borderBottom: '1px solid #FFBE3D',
            fontSize: '1.25rem',
            borderRadius: '0px',
            // borderColor: state.isFocused ? "yellow" : "green",
            // Removes weird border around container
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                // Overwrittes the different states of border
                // borderColor: state.isFocused ? "red" : "blue"
                borderBottom: '2px solid #FFBE3D',
            },
            "&:focus": {
                // Overwrittes the different states of border
                borderBottom: '2px solid #FFBE3D',
            },
        })
    };

    useEffect(() => {
        setInitial(true);
    }, []);

    useEffect(() => {
        if(initial === true){
            let __accountInfo = accountInfo;
            setIsStudent(__accountInfo.isStudent ? __accountInfo.isStudent : 0);
            setInstructions(__accountInfo.instructions ? __accountInfo.instructions : "");
            setUniversity(__accountInfo.university ? __accountInfo.university : {});
            setStudentID(__accountInfo.studentID ? __accountInfo.studentID : "");
            setWechatID(__accountInfo.wechatID ? __accountInfo.wechatID : "");
            setQuestion1(__accountInfo.question1 ? __accountInfo.question1 : 0);
            setQuestion2(__accountInfo.question2 ? __accountInfo.question2 : 0);

            accountInfo.instructions === undefined && setAccountInfo({
                instructions: "",
                isStudent: 0,
                question1: 0,
                question2: 0,
                studentID: "",
                university: {},
                wechatID: "",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initial]);

    const onNextHandler = () => {
        if (isStudent === 1) {
            if(university === undefined || university === {}) {
                onNotification({ title: 'warning', message: "common.no-input-university", visible: true, status: Math.floor(Math.random() * 100000) });
                return;
            }
            if (university.id === undefined || university.id === 0) {
                onNotification({ title: 'warning', message: "common.no-input-university", visible: true, status: Math.floor(Math.random() * 100000) });
                return;
            }
            if (studentID === "") {
                onNotification({ title: 'warning', message: "common.no-input-studentID", visible: true, status: Math.floor(Math.random() * 100000) });
                return;
            }
            if (studentID.length > 50) {
                onNotification({ title: 'warning', message: "common.no-input-studentID-validate", visible: true, status: Math.floor(Math.random() * 100000) });
                return;
            }
            if (wechatID !== "" && wechatID.length > 50) {
                onNotification({ title: 'warning', message: "common.no-input-wechatID-validate", visible: true, status: Math.floor(Math.random() * 100000) });
                return;
            }
        }

        onChangeStep();
    };

    const handleStudentRadioChange = (event) => {
        setAccountInfo({...accountInfo, isStudent: Number(event.target.value)});
        setIsStudent(Number(event.target.value));
    };

    return (
        <>
            <div className="content-container">
                <div className="content-page">
                    <div className="text-header text-black pb-[10px]">{t("page4.qu-account-info")}</div>
                    <div className="text-normal text-black">{t("page4.an-account-info")}</div>
                    <div className="mt-[33px]" >
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={8} md={8}>
                                <span className="text-normal">{t("page4.qu-are-you-student")}</span>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <RadioGroup row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={isStudent}
                                    onChange={handleStudentRadioChange}
                                >
                                    <CssFormControlLabel value={0} control={<CustomColorRadio />} label="No" />
                                    <CssFormControlLabel value={1} control={<CustomColorRadio />} label="Yes" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                {(isStudent === 1) && (
                                    <Grid container spacing={1} className="mb-[16px]">
                                        <Grid item xs={12} sm={12} md={6} className="pl-[10px] mt-[10px]">
                                            <Select options={props.universities} id="universities" className="mt-[10px]" styles={colourStyles} placeholder={t("common.wd-university")}
                                                onChange={(data) => {
                                                    setAccountInfo({...accountInfo, university: {id:data.id, label:data.label}});
                                                    setUniversity({id:data.id, label:data.label});
                                                }}
                                                value={
                                                    props.universities.filter(option =>
                                                        option.label === university?.label)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3} className="pl-[10px] mt-[10px]">
                                            <CssTextField fullWidth
                                                required
                                                id="studentID"
                                                label={t("common.wd-student-id")}
                                                variant="standard"
                                                value={studentID}
                                                onChange={(e) => { 
                                                    setAccountInfo({...accountInfo, studentID: e.target.value});
                                                    setStudentID(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3} className="pl-[10px] mt-[10px]">
                                            <CssTextField fullWidth
                                                id="WechatID"
                                                label={t("common.wd-wechat-id")}
                                                variant="standard"
                                                value={wechatID}
                                                onChange={(e) => {
                                                    setAccountInfo({...accountInfo, wechatID: e.target.value});
                                                    setWechatID(e.target.value);
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                                {(isStudent === 0) && (
                                    <></>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <CssTextField fullWidth
                                    id="instruction"
                                    label={t("common.wd-instruction")}
                                    variant="standard"
                                    value={instructions}
                                    onChange={(e) => {
                                        setAccountInfo({...accountInfo, instructions: e.target.value});
                                        setInstructions(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                                <span className="text-normal">{t("page4.qu-liver-walkup")} </span>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <RadioGroup row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={question1}
                                    onChange={(e) => { 
                                        setAccountInfo({...accountInfo, question1: Number(e.target.value)});
                                        setQuestion1(e.target.value);
                                    }}
                                >
                                    <CssFormControlLabel value={0} control={<CustomColorRadio />} label="No" />
                                    <CssFormControlLabel value={1} control={<CustomColorRadio />} label="Yes" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                                <span className="text-normal">{t("page4.qu-close-contact")}</span>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <RadioGroup row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={question2}
                                    onChange={(e) => {
                                        setAccountInfo({...accountInfo, question2: Number(e.target.value)});
                                        setQuestion2(e.target.value);
                                    }}
                                >
                                    <CssFormControlLabel value={0} control={<CustomColorRadio />} label="No" />
                                    <CssFormControlLabel value={1} control={<CustomColorRadio />} label="Yes" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <span className="text-normal">{t("page4.qu-covid19")}</span>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="flex item-center mt-[30px]"><span className="custom-btn hand" onClick={onNextHandler}>{t("common.wd-next")}</span></div>
            </div>
        </>
    )
}