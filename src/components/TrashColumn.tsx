import { Center, Paper, Transition } from "@mantine/core";
import { useDroppable } from "@dnd-kit/react";
import { ColumnId } from "types/board.types";
import { memo } from "react";
import { RiDeleteBinFill } from "@remixicon/react";

interface TrashColumnProps {
    id: ColumnId;
    isDragging: boolean;
    isTrashing: boolean;
}
export const TrashColumn = memo(
    ({ id, isDragging, isTrashing }: TrashColumnProps) => {
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
                        bg={isTrashing ? "red.6" : "gray.8"}
                        radius="xl"
                        p="md"
                        style={{
                            ...styles,
                            transform: `${styles.transform} ${
                                isTrashing ? "scale(1.08)" : "scale(1)"
                            }`,
                        }}
                    >
                        <Center w={44} h={44}>
                            <RiDeleteBinFill size={26} color="white" />
                        </Center>
                    </Paper>
                )}
            </Transition>
        );
    },
);
