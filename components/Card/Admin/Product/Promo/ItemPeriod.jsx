const ItemPeriodPromo = ({ active, start, end }) => {
  return(
    <>
      {active ? (
        <>
          <small className="text-black-50">Mulai</small>
          <p className="date-discount">{start}</p>
          <small className="text-muted">Selesai</small>
          <p className="date-discount">{end}</p>
        </>
      ):(
        <p className="date-discount">{start}</p>
      )}

      <style jsx>{`
        .date-discount{
          margin-bottom: 0;
          line-height: 1;
        }
      `}</style>
    </>
  )
}

export default ItemPeriodPromo
