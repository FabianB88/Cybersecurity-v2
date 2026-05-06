export default function SwirlBackground({ image }) {
  const src = image?.local ?? image?.remote ?? null
  return (
    <div className="swirl-canvas" aria-hidden="true">
      {src && (
        <div
          className="swirl-bg-image"
          style={{ backgroundImage: `url(${src})` }}
        />
      )}
      <div className="swirl-blob blob-one" />
      <div className="swirl-blob blob-two" />
      <div className="swirl-blob blob-three" />
    </div>
  )
}
