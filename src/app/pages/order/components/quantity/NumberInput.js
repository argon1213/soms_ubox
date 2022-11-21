
const NumberInput = props => {
    const { onChange } = props;
    const onChangeHandle = (e) => {
        onChange(e.target.value);
    }

    return (
        <>
            <input type="number" min={2} max={18} value={props.value} onChange={onChangeHandle} className={`number-input ${props.value !== 0 ? "bg-active":"bg-default"} text-normal-18 text-white ${props.className}`} />
        </>
    );
}
export default NumberInput;