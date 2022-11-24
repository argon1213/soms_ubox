import { Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const Stepper = (props) => {
    const { step, logged, stepChange } = props;

    const min = (a, b) => {
        if (a > b)
            return b;
        else return a;
    }

    const onChangeStep = async (targetStep) => {
        if(step === 5) return;
        const result = await props.previousActionCallback();
        stepChange(min(targetStep, result));
    }

    const changeNextStep = () => {
        let __step = step;
        if(step >= 4) {
            __step = step;
        } else {
            __step ++;
        }
        onChangeStep(__step);
    }

    const changeBeforeStep = () => {
        let __step = step;
        if(step <= 0) {
            __step = step;
        } else {
            __step --;
        }
        onChangeStep(__step);
    }
    
    return (
        <>
        <div className="stepper mx-auto">
            <div>
                <div className="spliter-line-gray"/>
            </div>
            <div>
                <div className="stepper-content">
                    <div className={`stepper-item ${step >= 0 ? "selected":""}`} onClick={(e) => { onChangeStep(0)}}>
                        <div className="inner-circle m-auto"></div>                    
                    </div>
                    <div className={`stepper-item ${step >= 1 ? "selected":""}`} onClick={(e) => { onChangeStep(1)}}>
                        <div className="inner-circle m-auto"></div>                    
                    </div>
                    <div className={`stepper-item ${step >= 2 ? "selected":""}`} onClick={(e) => { onChangeStep(2)}}>
                        <div className="inner-circle m-auto"></div>                    
                    </div>
                    <div className={`stepper-item ${step >= 3 ? "selected":""}`} onClick={(e) => { onChangeStep(3)}}>
                        <div className="inner-circle m-auto"></div>                    
                    </div>
                    <div className={`stepper-item ${(step >= 4 &&  logged === 1) ? "selected":""}`} onClick={(e) => { onChangeStep(4)}}>
                        <div className="inner-circle m-auto"></div>                    
                    </div>
                </div>
            </div>
        </div>
        <div className="arrowStepper mx-auto">
            {step !== 0 && step !== 5 && <Button shape="circle" size="large" className="arrowLeft" icon={<ArrowLeftOutlined style={{display: 'block'}} />} onClick={changeBeforeStep} />}
            {/* {step !== 5 && <Button shape="circle" size="large" className="arrowRight" icon={<ArrowRightOutlined style={{display: 'block'}} />} onClick={changeNextStep} />} */}
            {step !== 5 && ((step !== 4 || logged === 0) ? true : false) && <Button shape="circle" size="large" className="arrowRight" icon={<ArrowRightOutlined style={{display: 'block'}} />} onClick={changeNextStep} />}
        </div>
        </>
    );
}

export default Stepper;