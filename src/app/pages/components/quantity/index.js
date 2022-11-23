import { useState } from "react";
import NumberInput from "./NumberInput";

const Quantity = (props) => {
    const { item, onChangeHandler } = props;
    const [value, setValue] = useState(props.value);
    const minusValue = () => {onChangeInput(value === 0 ? 0: value-1);}
    const plusValue = () => {onChangeInput(value+1);}
    const onChangeInput = (value) => {
        setValue(value);
        onChangeHandler(item, value);
    }
    return (
        <div className="flex item-center">
            <div className="flex my-auto min-w-[96px]">
                <div className="my-auto">
                    <img src="/images/vleft.png" alt="minus" className="hand" onClick={minusValue} width={8} height={12}/>
                </div>
                <NumberInput className="mr-[14px] ml-[14px]" value={value} onChange={onChangeInput}/>
                <div className="my-auto">
                    <img src="/images/vright.png" alt="plus" className="hand" onClick={plusValue} width={8} height={12} />
                </div>
            </div>
        </div>
    );
}

export default Quantity;