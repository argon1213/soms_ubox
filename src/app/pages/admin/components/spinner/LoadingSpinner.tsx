import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';

const antIconLarge = <LoadingOutlined style={{ fontSize: 60, color: 'white'}} spin />;

export const LoadingSpinner = () => {

  return (
    <div
      className="modal-backdrop fade show d-flex justify-content-center align-items-center"
    >
        <Spin indicator={antIconLarge} />
    </div>
  )
}