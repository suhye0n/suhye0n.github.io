import Carousel from '@/components/Carousel'
import Modal from '@/components/Modal'

type LightboxProps = {
  images: string[] | null
  caption?: string
  ratio?: string
  onClose: () => void
}

export default function Lightbox({
  images,
  caption,
  ratio = 'aspect-3/4',
  onClose,
}: LightboxProps) {
  return (
    <Modal
      open={images !== null && images.length > 0}
      onClose={onClose}
      label={caption ?? '이미지 크게 보기'}
      panelClassName="max-w-2xl"
    >
      {images && images.length > 0 && (
        <figure className="glass rounded-sm p-3 sm:p-4">
          <Carousel images={images} alt={caption ?? ''} fit="contain" ratio={ratio} />
          {caption && (
            <figcaption className="px-2 pt-4 pb-1 text-center text-sm text-white/60">
              {caption}
            </figcaption>
          )}
        </figure>
      )}
    </Modal>
  )
}
