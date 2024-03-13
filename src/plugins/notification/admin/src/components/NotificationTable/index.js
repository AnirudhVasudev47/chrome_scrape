import React from "react";
import {
  Table,
  Thead,
  Tr,
  Typography,
  Th,
  IconButton,
  BaseCheckbox,
  Box,
  CarretDown,
  Tbody,
  TFooter,
  Td,
  VisuallyHidden,
  Flex,
  Avatar
} from "@strapi/design-system";
import {Pencil, Plus, Trash} from "@strapi/icons";
import short from "short-uuid";

const TableComponent = ({data, onEdit, onDelete, onAddTable}) => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const entries = [
    {
      to: 'Anirudh Vasudev',
      message: 'Chez Léon is a human sized Parisian',
      type: 'French cuisine',
      createdAt: 'Leon Lafrite',
      uuid: 0,
      id: 0,
    },
    {
      to: 'Anirudh Vasudev',
      message: 'Chez Léon is a human sized Parisian',
      type: 'French cuisine',
      createdAt: 'Leon Lafrite',
      uuid: 1,
      id: 1
    },
    {
      to: 'Anirudh Vasudev',
      message: 'Chez Léon is a human sized Parisian',
      type: 'French cuisine',
      createdAt: 'Leon Lafrite',
      uuid: 2,
      id: 2
    },
    {
      to: 'Anirudh Vasudev',
      message: 'Chez Léon is a human sized Parisian',
      type: 'French cuisine',
      createdAt: 'Leon Lafrite',
      uuid: 3,
      id: 3,
    },
    {
      to: 'Anirudh Vasudev',
      message: 'Chez Léon is a human sized Parisian',
      type: 'French cuisine',
      createdAt: 'Leon Lafrite',
      uuid: 4,
      id: 4,
    }
  ]

  return (
    <Box padding={8} background="neutral100">
      <Table colCount={COL_COUNT} rowCount={ROW_COUNT}
             footer={<TFooter onClick={onAddTable} icon={<Plus/>}>Add another field to this collection type</TFooter>}>
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">ID</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Type</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">To</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Message</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Created At</Typography>
            </Th>
            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(entry => <Tr key={entry.id}>
            <Td>
              <Typography textColor="neutral800">{entry.uuid}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{entry.type}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{entry.to}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{entry.message}</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{entry.createdAt}</Typography>
            </Td>
            <Td>
              <Flex>
                <IconButton onClick={() => onEdit(entry.id)} label="Edit" noBorder icon={<Pencil/>}/>
                <Box paddingLeft={1}>
                  <IconButton onClick={() => onDelete(entry.id)} label="Delete" noBorder icon={<Trash/>}/>
                </Box>
              </Flex>
            </Td>
          </Tr>)}
        </Tbody>
      </Table>
    </Box>
  )
}

export default TableComponent;
