## 2026-05-26

Migrated dnd-kit to latest version

### Added

- Added TaskCardOverlay
- Added board.constants.ts

### Changed

- Changed the data structure and approach of handleAddTask, handleContentChange
- Renamed TaskContainer and TaskSection
- Changed type to interface for TaskColumnProps and TaskCardProps

### Removed

- Removed handleDragEnd, sensors, collisions from dnd components

## 2026-05-20

Added TiptapJs editor and enhanced the styling of TaskCard

### Added

- Added TiptapJs editor with BubbleMenu
- Added draggable handler for TaskCard
- Added checkbox for TaskCard

### Updated

- Enhanced the styling of TaskCard after adding new components

## 2026-05-13

Added handleAddTask, Memoized TaskSection and TaskCard

### Added

- Added handleAddTask
- Added memoization for TaskSection and TaskCard

## 2026-05-12

Implemented sorting in task sections and enhanced DnD styling

### Added

- Added sorting in task section
- Added localStorage to manage data

## 2026-03-17

Implemented Drag and Drop (DnD) feature

### Added

- Added TaskContainer and task types
- Added DnD feature and drag overlay with DnD kit

## 2025-10-23

Added styling related and components

### Added

- Setup theme
- Added fontWeights constants
- Setup global font using Next.js font optimization
- Added NewTaskButton, TaskCard, TaskSection components

### Updated

- Updated README.md

## 2025-10-14

Setup project

### Added

- Setup Mantine library
