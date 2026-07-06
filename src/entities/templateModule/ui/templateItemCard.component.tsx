import type { TemplateItemCardProps } from './types'
import { Badge, Button, Card, Group, Text, Title } from '@mantine/core'
import { reatomComponent } from '@reatom/react'

export const TemplateItemCard = reatomComponent(
	({ item, onToggleSelected }: TemplateItemCardProps) => {
		const isSelected = item.isSelected()

		return (
			<Card withBorder radius="md" padding="lg" h="100%">
				<Group justify="space-between" align="flex-start" mb="md">
					<Badge variant="light">{item.badge}</Badge>
					<Text size="xs" c="dimmed" tt="uppercase" fw={700}>
						{item.area}
					</Text>
				</Group>

				<Title order={3} size="h4" mb="xs">
					{item.title}
				</Title>

				<Text c="dimmed" size="sm" mb="lg">
					{item.description}
				</Text>

				<Button
					mt="auto"
					variant={isSelected ? 'filled' : 'light'}
					onClick={() => onToggleSelected(item.id)}
				>
					{isSelected ? 'Selected' : 'Select example'}
				</Button>
			</Card>
		)
	},
)
