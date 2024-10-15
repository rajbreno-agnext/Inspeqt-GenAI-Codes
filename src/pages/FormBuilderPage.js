import React, { useState, useCallback } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Flex,
  Input,
  Textarea,
  Collapse,
  Portal,
  MenuGroup,
  MenuDivider,
  Button,
  InputGroup,
  InputLeftElement,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon, ChevronUpIcon, DragHandleIcon, SearchIcon, CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  MdTextFields, MdShortText, MdSubject, 
  MdCheckBox, MdArrowDropDownCircle, MdLinearScale,
  MdEmail, MdPhone, MdDateRange, MdImage, MdCloudUpload,
  MdContentCopy, MdDelete
} from 'react-icons/md';
import { HiViewBoards } from 'react-icons/hi';
import { FaHashtag } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

const FormBuilderPage = () => {
  const [formSections, setFormSections] = useState([{ id: 'section-1', isOpen: true, elements: [] }]);
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addElement = (elementType, sectionIndex, elementIndex) => {
    setFormSections(prevSections => {
      const newSections = [...prevSections];
      if (elementType === 'Add Section') {
        const newSection = { id: `section-${Date.now()}`, isOpen: true, elements: [] };
        newSections.splice(sectionIndex + 1, 0, newSection);
      } else {
        const newElement = { type: elementType, id: Date.now().toString() };
        newSections[sectionIndex] = {
          ...newSections[sectionIndex],
          isOpen: true,
          elements: [
            ...newSections[sectionIndex].elements.slice(0, elementIndex + 1),
            newElement,
            ...newSections[sectionIndex].elements.slice(elementIndex + 1)
          ]
        };
      }
      return newSections;
    });
    onMenuClose();
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFormSections((sections) => {
        const oldIndex = sections.findIndex(section => section.id === active.id);
        const newIndex = sections.findIndex(section => section.id === over.id);

        // If dragging sections
        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(sections, oldIndex, newIndex);
        }

        let oldSectionIndex = sections.findIndex((section) => 
          section.elements.some((element) => element.id === active.id)
        );
        let newSectionIndex = sections.findIndex((section) => 
          section.id === over.id || section.elements.some((element) => element.id === over.id)
        );

        // If dropping onto a section
        if (sections[newSectionIndex] && !sections[newSectionIndex].elements.some(e => e.id === over.id)) {
          const [movedItem] = sections[oldSectionIndex].elements.splice(
            sections[oldSectionIndex].elements.findIndex(e => e.id === active.id),
            1
          );
          sections[newSectionIndex].elements.push(movedItem);
          return [...sections];
        }

        // If dropping between elements
        const oldElementIndex = sections[oldSectionIndex].elements.findIndex((element) => element.id === active.id);
        const newElementIndex = sections[newSectionIndex].elements.findIndex((element) => element.id === over.id);

        const updatedSections = [...sections];
        const [movedItem] = updatedSections[oldSectionIndex].elements.splice(oldElementIndex, 1);

        if (oldSectionIndex === newSectionIndex) {
          updatedSections[newSectionIndex].elements.splice(newElementIndex, 0, movedItem);
        } else {
          updatedSections[newSectionIndex].elements.splice(newElementIndex, 0, movedItem);
          updatedSections[newSectionIndex].isOpen = true;
        }

        return updatedSections;
      });
    }
    setActiveId(null);
  };

  const duplicateElement = (sectionIndex, elementIndex) => {
    setFormSections(prevSections => {
      const newSections = [...prevSections];
      const elementToDuplicate = { ...newSections[sectionIndex].elements[elementIndex], id: Date.now().toString() };
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        elements: [
          ...newSections[sectionIndex].elements.slice(0, elementIndex + 1),
          elementToDuplicate,
          ...newSections[sectionIndex].elements.slice(elementIndex + 1)
        ]
      };
      return newSections;
    });
  };

  const deleteElement = (sectionIndex, elementIndex) => {
    setFormSections(prevSections => {
      const newSections = [...prevSections];
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        elements: newSections[sectionIndex].elements.filter((_, index) => index !== elementIndex)
      };
      return newSections;
    });
  };

  const duplicateSection = (sectionIndex) => {
    setFormSections(prevSections => {
      const newSections = [...prevSections];
      const sectionToDuplicate = {
        ...newSections[sectionIndex],
        id: `section-${Date.now()}`,
        elements: newSections[sectionIndex].elements.map(element => ({ ...element, id: Date.now().toString() }))
      };
      newSections.splice(sectionIndex + 1, 0, sectionToDuplicate);
      return newSections;
    });
  };

  const deleteSection = (sectionIndex) => {
    setFormSections(prevSections => prevSections.filter((_, index) => index !== sectionIndex));
  };

  const menuItems = [
    { group: 'Blocks', items: [
      { icon: HiViewBoards, label: 'Add Section' },
    ]},
    { group: 'Text', items: [
      { icon: MdShortText, label: 'Short answer' },
      { icon: MdSubject, label: 'Long answer' },
    ]},
    { group: 'Choices', items: [
      { icon: MdCheckBox, label: 'Single select' },
      { icon: MdCheckBox, label: 'Multi select' },
      { icon: MdCheckBox, label: 'Checkbox' },
      { icon: MdArrowDropDownCircle, label: 'Dropdown' },
      { icon: MdLinearScale, label: 'Slider' },
    ]},
    { group: 'Number', items: [
      { icon: FaHashtag, label: 'Number' },
    ]},
    { group: 'Contact info', items: [
      { icon: MdEmail, label: 'Email input' },
      { icon: MdPhone, label: 'Phone number' },
      { icon: MdDateRange, label: 'Date / time picker' },
    ]},
    { group: 'Uploads', items: [
      { icon: MdImage, label: 'Media' },
      { icon: MdCloudUpload, label: 'File uploader' },
    ]},
  ];

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const filteredMenuItems = menuItems.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const renderMenuItems = (items, sectionIndex, elementIndex) => (
    <Menu key={elementIndex}>
      <MenuButton
        as={IconButton}
        icon={<AddIcon />}
        aria-label="Add element"
        variant="ghost"
        size="sm"
      />
      <Portal>
        <MenuList maxHeight="400px" overflowY="auto" css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'gray.300',
            borderRadius: '24px',
          },
        }}>
          <Box px={4} py={2}>
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search element"
                value={searchQuery}
                onChange={handleSearch}
                borderRadius="md"
              />
            </InputGroup>
          </Box>
          <MenuDivider />
          {filteredMenuItems.map((group, groupIndex) => (
            <MenuGroup key={groupIndex} title={group.group}>
              {group.items.map((item, itemIndex) => (
                <MenuItem 
                  key={itemIndex} 
                  icon={<item.icon />} 
                  onClick={() => addElement(item.label, sectionIndex, elementIndex)}
                >
                  {item.label}
                </MenuItem>
              ))}
              {groupIndex < filteredMenuItems.length - 1 && <MenuDivider />}
            </MenuGroup>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );

  const renderFormElement = (element) => {
    switch (element.type) {
      case 'Short answer':
        return <Input placeholder="Short answer" />;
      case 'Long answer':
        return <Textarea placeholder="Long answer" />;
      case 'Single select':
        return (
          <RadioGroup>
            <Stack>
              <Radio value="1">Option 1</Radio>
              <Radio value="2">Option 2</Radio>
              <Radio value="3">Option 3</Radio>
            </Stack>
          </RadioGroup>
        );
      case 'Multi select':
        return (
          <VStack align="start">
            <Checkbox>Option 1</Checkbox>
            <Checkbox>Option 2</Checkbox>
            <Checkbox>Option 3</Checkbox>
          </VStack>
        );
      case 'Checkbox':
        return <Checkbox>Checkbox label</Checkbox>;
      case 'Dropdown':
        return (
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        );
      case 'Slider':
        return (
          <Slider aria-label="slider-example" defaultValue={30}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        );
      case 'Number':
        return (
          <NumberInput>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        );
      case 'Email input':
        return <Input type="email" placeholder="Enter email" />;
      case 'Phone number':
        return <Input type="tel" placeholder="Enter phone number" />;
      case 'Date / time picker':
        return <Input type="datetime-local" />;
      case 'Media':
      case 'File uploader':
        return (
          <Box borderWidth="1px" borderStyle="dashed" borderRadius="md" p={4} bg="white">
            <Flex justify="center" align="center" direction="column" h="100px">
              <AddIcon mb={2} />
              <Text fontSize="sm" color="gray.500">Click to upload or drag and drop</Text>
            </Flex>
          </Box>
        );
      default:
        return <Input placeholder={`${element.type} placeholder`} />;
    }
  };

  const SortableItem = ({ element, sectionIndex, elementIndex }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id: element.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <Box
        ref={setNodeRef}
        style={style}
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="sm"
        borderWidth="1px"
        borderColor="gray.200"
        position="relative"
        _hover={{
          "& > .element-actions": {
            opacity: 1,
          }
        }}
      >
        <Flex justify="space-between" align="center" mb={2}>
          <Flex align="center">
            <Text fontWeight="bold">{element.type}</Text>
          </Flex>
        </Flex>
        {renderFormElement(element)}
        <Flex 
          className="element-actions"
          position="absolute"
          top={2}
          right={2}
          opacity={0}
          transition="opacity 0.2s"
        >
          <IconButton
            icon={<MdContentCopy />}
            aria-label="Duplicate"
            variant="ghost"
            size="sm"
            mr={1}
            onClick={() => duplicateElement(sectionIndex, elementIndex)}
          />
          <IconButton
            icon={<AiOutlineDelete />}  // Changed to AiOutlineDelete
            aria-label="Delete"
            variant="ghost"
            size="sm"
            mr={1}
            onClick={() => deleteElement(sectionIndex, elementIndex)}
          />
          {renderMenuItems(menuItems, sectionIndex, elementIndex)}
          <IconButton
            {...attributes}
            {...listeners}
            icon={<DragHandleIcon />}
            aria-label="Drag"
            variant="ghost"
            size="sm"
            cursor="grab"
          />
        </Flex>
      </Box>
    );
  };

  const SortableSection = ({ section, sectionIndex }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id: section.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <Box 
        ref={setNodeRef}
        style={style}
        bg="white" 
        borderRadius="md" 
        boxShadow="sm" 
        mb={4} 
        overflow="visible"
        position="relative"
      >
        <Flex 
          justify="space-between" 
          align="center" 
          p={4} 
          borderBottomWidth={section.isOpen ? "1px" : "0"}
          borderBottomColor="gray.200"
          position="relative"
          _hover={{
            "& > .section-actions": {
              opacity: 1,
            }
          }}
        >
          <Flex align="center" onClick={() => {
            const newSections = [...formSections];
            newSections[sectionIndex].isOpen = !newSections[sectionIndex].isOpen;
            setFormSections(newSections);
          }} cursor="pointer" flex={1}>
            <Heading size="md">Section {sectionIndex + 1}</Heading>
            <IconButton
              icon={section.isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              variant="ghost"
              aria-label={section.isOpen ? "Collapse section" : "Expand section"}
              ml={2}
            />
          </Flex>
          <Flex 
            className="section-actions"
            opacity={0}
            transition="opacity 0.2s"
            position="absolute"
            right={4}
            top="50%"
            transform="translateY(-50%)"
          >
            <IconButton
              icon={<MdContentCopy />}
              aria-label="Duplicate Section"
              variant="ghost"
              size="sm"
              mr={1}
              onClick={() => duplicateSection(sectionIndex)}
            />
            {formSections.length > 1 && (
              <IconButton
                icon={<AiOutlineDelete />}
                aria-label="Delete Section"
                variant="ghost"
                size="sm"
                mr={1}
                onClick={() => deleteSection(sectionIndex)}
              />
            )}
            {renderMenuItems(menuItems, sectionIndex, -1)}
            <IconButton
              {...attributes}
              {...listeners}
              icon={<DragHandleIcon />}
              aria-label="Drag Section"
              variant="ghost"
              size="sm"
              cursor="grab"
            />
          </Flex>
        </Flex>
        <Collapse in={section.isOpen}>
          <Box p={4}>
            <SortableContext 
              items={section.elements.map(element => element.id)}
              strategy={verticalListSortingStrategy}
            >
              <VStack spacing={4} align="stretch">
                {section.elements.map((element, elementIndex) => (
                  <SortableItem 
                    key={element.id} 
                    element={element} 
                    sectionIndex={sectionIndex} 
                    elementIndex={elementIndex} 
                  />
                ))}
              </VStack>
            </SortableContext>
          </Box>
        </Collapse>
      </Box>
    );
  };

  return (
    <Box maxWidth="800px" margin="auto" p={4}>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={formSections.map(section => section.id)}
          strategy={verticalListSortingStrategy}
        >
          {formSections.map((section, sectionIndex) => (
            <SortableSection
              key={section.id}
              section={section}
              sectionIndex={sectionIndex}
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <Box
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="lg"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Text fontWeight="bold">
                {formSections.find(s => s.id === activeId) 
                  ? `Section ${formSections.findIndex(s => s.id === activeId) + 1}`
                  : formSections.flatMap(s => s.elements).find(e => e.id === activeId)?.type}
              </Text>
            </Box>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};

export default FormBuilderPage;