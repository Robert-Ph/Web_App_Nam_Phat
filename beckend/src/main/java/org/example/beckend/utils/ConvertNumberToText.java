package org.example.beckend.utils;

import jakarta.persistence.OneToMany;
import org.springframework.stereotype.Component;

@Component
public class ConvertNumberToText {

    private static final String[] ONE_CHAR = {"một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"};
    private static final String[] thousands = {
            "", "nghìn", "triệu", "tỷ"
    };


    public static String convertThree(int number) {
        StringBuilder sb = new StringBuilder();

        int twoNumber = number % 100;

        if (number >= 100) {
            sb.append(ONE_CHAR[(int) number / 100 - 1] + " trăm ");
            if (twoNumber < 10 && twoNumber >0) {
                sb.append(" lẻ ");
            }
        }

        if (twoNumber == 0) {
            sb.append("");
        } else if (twoNumber <= 10) {
            sb.append(ONE_CHAR[twoNumber - 1]);

        } else if (twoNumber < 20) {
            if(twoNumber == 15){
                sb.append("mười lăm " );
            }else {
                sb.append("mười " + ONE_CHAR[twoNumber % 10 - 1] + " ");
            }

        } else {
            int firstNumber = twoNumber / 10;

            int second = twoNumber % (firstNumber * 10);


            sb.append(ONE_CHAR[firstNumber - 1] + " mươi ");
            if (second != 0) {
                if (second == 5) {
                    sb.append("lăm");
                } else {
                    sb.append((second == 1 ? "mốt " : ONE_CHAR[second - 1] + " "));
                }
            }


        }


        return sb.toString().trim().replaceAll("\\s+", " ");
    }

    public static String convert(long number) {
        if (number == 0) {
            return "không";
        }

        String words = "";
        int thousandCounter = 0;

        while (number > 0) {
            if (number % 1000 != 0) {
                words = convertThree((int) (number % 1000)) + " " + thousands[thousandCounter] + " " + words;
            }
            number /= 1000;
            thousandCounter++;
        }

        return words.trim().replaceAll("\\s+", " ");
    }

    public static void main(String[] args) {
        System.out.println(convert(1000));
        System.out.println(convert(1251));
        System.out.println(convert(12510));
        System.out.println(convert(125100));
        System.out.println(convert(1251000000));
        System.out.println(convert(1180000));
    }
}
