<script setup>
import { ref } from "vue";
import { Notyf } from "notyf";
import api from "../api";

const props = defineProps({
	workoutData: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(["deleted", "completed"]);

const notyf = new Notyf();
const isDeleting = ref(false);
const isCompleting = ref(false);

async function deleteWorkout() {
	isDeleting.value = true;

	try {
		await api.delete(`/workouts/deleteWorkout/${props.workoutData._id}`);

		notyf.success("Workout deleted successfully!");
		emit("deleted", props.workoutData._id);
	} catch (error) {
		console.error("Delete Workout Error:", error);
		notyf.error(error.response?.data?.error?.message || error.response?.data?.error || "Unable to delete workout.");
	} finally {
		isDeleting.value = false;
	}
}

async function completeWorkout() {
	isCompleting.value = true;

	try {
		await api.patch(`/workouts/completeWorkoutStatus/${props.workoutData._id}`);

		notyf.success("Workout marked as completed!");
		emit("completed", props.workoutData._id);
	} catch (error) {
		console.error("Complete Workout Error:", error);
		notyf.error(error.response?.data?.error?.message || error.response?.data?.error || "Unable to update workout status.");
	} finally {
		isCompleting.value = false;
	}
}
</script>

<template>
	<div class="card border-0 shadow-sm rounded-4 h-100">
		<div class="card-body p-4">
			<div class="d-flex justify-content-between align-items-start mb-3">
				<div class="bg-primary bg-opacity-10 text-primary rounded-3 p-3">
					<i class="bi bi-activity fs-4"></i>
				</div>

				<span class="badge rounded-pill text-capitalize px-3 py-2" :class="workoutData.status === 'completed' ? 'bg-success' : 'bg-warning'">
					{{ workoutData.status }}
				</span>
			</div>

			<h5 class="fw-bold mb-3">
				{{ workoutData.name }}
			</h5>

			<p class="text-secondary mb-4">
				<i class="bi bi-clock me-2"></i>
				{{ workoutData.duration }} minutes
			</p>

			<div class="d-flex gap-2 mb-2">
				<router-link
					:to="{
						name: 'Edit Workout',
						params: { id: workoutData._id },
						query: {
							name: workoutData.name,
							duration: workoutData.duration,
						},
					}"
					class="btn btn-outline-primary w-100"
				>
					<i class="bi bi-pencil-square me-1"></i>
					Edit
				</router-link>

				<button class="btn btn-outline-danger w-100" @click="deleteWorkout" :disabled="isDeleting || isCompleting">
					<span v-if="isDeleting">
						<span class="spinner-border spinner-border-sm"></span>
					</span>
					<span v-else>
						<i class="bi bi-trash me-1"></i>
						Delete
					</span>
				</button>
			</div>

			<button v-if="workoutData.status !== 'completed'" class="btn btn-success w-100" @click="completeWorkout" :disabled="isCompleting || isDeleting">
				<span v-if="isCompleting">
					<span class="spinner-border spinner-border-sm me-2"></span>
					Updating...
				</span>

				<span v-else>
					<i class="bi bi-check-circle me-1"></i>
					Mark as Completed
				</span>
			</button>
		</div>
	</div>
</template>
