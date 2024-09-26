import Spinning from '@/app/assets/img/spinning.png';
import Image from 'next/image';

interface Props{
    size?: number
}
export function ActivityIndicator({size = 20}: Props){
    return(
        <Image
            src={Spinning}
            alt='Activity indicator'
            width={size}
            height={size}
            className='animate-spin'
        />
    )
}