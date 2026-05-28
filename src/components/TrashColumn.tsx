import { Paper, Transition } from "@mantine/core";
import { useDroppable } from "@dnd-kit/react";
import { ColumnId } from "types/board.types";
import { memo } from "react";
import { RiDeleteBinFill } from "@remixicon/react";

interface TrashColumnProps {
    id: ColumnId;
    isDragging: boolean;
}
export const TrashColumn = memo(({ id, isDragging }: TrashColumnProps) => {
    const { ref } = useDroppable({
        id,
    });

    return (
        <Transition
            mounted={isDragging}
            transition="pop-top-right"
            duration={400}
            timingFunction="ease"
        >
            {(styles) => (
                <Paper
                    ref={ref}
                    bg="red"
                    radius="sm"
                    p="lg"
                    shadow="xl"
                    style={styles}
                >
                    <RiDeleteBinFill color="white" />
                </Paper>
            )}
        </Transition>
    );
});
