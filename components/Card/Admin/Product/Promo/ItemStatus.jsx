import { Badge } from 'antd'

const ItemStatusPromo = ({ statusPromo }) => (
  <>
    <div className="noselect">
      {statusPromo === "Tidak Aktif" && <Badge color="#6c757d" text={statusPromo} />}
      {statusPromo === "Akan Datang" && <Badge color="yellow" text={statusPromo} />}
      {statusPromo === "Sedang Berjalan" && <Badge className="badge-green-processing" status="processing" color="green" text={statusPromo} />}
    </div>
    <style jsx>{`
      :global(.badge-green-processing > .ant-badge-status-processing::after){
        border: 1px solid #53c519;
      }
    `}</style>
  </>
)

export default ItemStatusPromo
