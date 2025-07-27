// import Image from './Image'
import Link from './Link'

const Card = ({ title, description, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div>
      <div className="p-6">
        <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        {href && (
          <Link
            href={href}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium"
            aria-label={`Link to ${title}`}
          >
            Xem thêm&rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
