import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons"

const OrderByIcon = (props) => {
  const { orderByKey } = props;

  switch (orderByKey) {
    case 0:
      return <></>;
    case 1:
      return <CaretUpOutlined style={{fontSize: "18px"}} />;
    case 2:
      return <CaretDownOutlined style={{fontSize: "18px"}} />;
    default:
      return <></>;
  }
}

export default OrderByIcon