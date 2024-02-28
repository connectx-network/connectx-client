import { COLORS, RANDOM_COLORS } from "@/constant/color";

export const getColorByName = (name: string) => {
    if (name) {
        let colorList = RANDOM_COLORS;
        let index = 0;
        if (name.length > 0) {
            index = name.charCodeAt(0);
            if (index > 65) index -= 65;
            if (name.length > 1) {
                index += name.charCodeAt(1);
                if (index > 65) index -= 65;
            }
        }
        index = index % colorList.length;

        return colorList[index];
    }
    return COLORS.PURPLE;
};