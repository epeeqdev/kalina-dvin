import {Typography} from "@/app/main/components/controls/typography";

interface Props {
    title: string;
    option:number
}

export const AboutOptions = ({title, option}: Props) => {
    const formatNumber = (number: number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return(
        <div>
            <Typography size='2xl' color='secondary' fontWeight={700}>{`${formatNumber(option)}+`}</Typography>
            <Typography size='lg' color='primary' fontWeight={500}>{title}</Typography>
        </div>
    )
}